import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API route for AI HTML & CodePen analysis
app.post("/api/analyze-html-codepen", async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: "Yêu cung cấp URL hoặc mã HTML." });
  }

  let contentToAnalyze = input;

  if (input.startsWith("http://") || input.startsWith("https://")) {
    let url = input;
    if (url.includes("codepen.io") && url.includes("/pen/")) {
      if (!url.endsWith(".html") && !url.endsWith(".js") && !url.endsWith(".css")) {
        url = url.split("?")[0].split("#")[0] + ".html";
      }
    }
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      if (response.ok) {
        contentToAnalyze = await response.text();
      } else {
        // Fallback to original URL
        const retryResponse = await fetch(input, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          }
        });
        if (retryResponse.ok) {
          contentToAnalyze = await retryResponse.text();
        }
      }
    } catch (err) {
      console.error("Error fetching URL:", err);
    }
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Truncate content to avoid token overflow
    if (contentToAnalyze.length > 20000) {
      contentToAnalyze = contentToAnalyze.substring(0, 20000) + "... [TRUNCATED]";
    }

    const prompt = `Bạn là chuyên gia phân tích UI/UX và thiết kế website hàng đầu.
Nhiệm vụ của bạn là phân tích mã HTML sau đây (hoặc nội dung thô từ trang web/CodePen) và bóc tách ra danh sách các đối tượng/thành phần giao diện nổi bật hiện có trong đó.
Với mỗi đối tượng tìm thấy, hãy mô tả cấu trúc hiện tại và đề xuất các tính năng, hiệu ứng giao diện (features/styles) cụ thể có thể thêm vào đối tượng đó để nâng cấp trải nghiệm người dùng.

Mã HTML/Nội dung để phân tích:
${contentToAnalyze}

Hãy trả về kết quả dưới dạng danh sách đối tượng JSON có cấu trúc rõ ràng.`;

    const result = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Tên đối tượng hoặc thành phần giao diện (ví dụ: 'Thẻ giá sản phẩm')" },
              type: { type: Type.STRING, description: "Phân loại thành phần (ví dụ: 'Card', 'Button', 'Header', 'Form', 'Section')" },
              description: { type: Type.STRING, description: "Mô tả chi tiết cấu trúc hiện tại bóc tách được" },
              suggestions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Danh sách 3-5 gợi ý tính năng hoặc style có thể thêm vào thành phần này (ví dụ: 'Thêm hiệu ứng Glassmorphism', 'Thêm hover zoom 3D', 'Thêm badge Hot')"
              }
            },
            required: ["name", "type", "description", "suggestions"]
          }
        }
      }
    });

    const text = result.text;
    if (!text) {
      throw new Error("Không nhận được phản hồi từ Gemini API.");
    }

    const parsedResults = JSON.parse(text);
    return res.json({ results: parsedResults });
  } catch (err: any) {
    console.error("Gemini analysis failed:", err);
    return res.status(500).json({ error: "Phân tích thất bại: " + err.message });
  }
});

// API route for AI prompt optimization
app.post("/api/optimize-prompt", async (req, res) => {
  const { promptText, mode } = req.body; // mode can be 'normal', 'shorten', 'expand'
  if (!promptText) {
    return res.status(400).json({ error: "Yêu cầu cung cấp nội dung prompt gốc." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    let systemInstruction = "Bạn là chuyên gia thiết kế và viết prompt kỹ thuật tối ưu hóa cho AI Agent lập trình và thiết kế giao diện (như Devin, Antigravity, or AI Coding Agent).";
    let contents = `Hãy chuyển đổi yêu cầu thiết kế thô tục, đơn giản từ người dùng thành một prompt chuyên nghiệp, rõ ràng, giàu chi tiết kỹ thuật cho Agent AI thực hiện xuất sắc.
Yêu cầu người dùng: "${promptText}"

Hãy tập trung vào việc mô tả chính xác về:
1. Bố cục và cấu trúc (Layout, Grid, Flexbox, Spacing)
2. Màu sắc, chất liệu và độ tương phản (Neutrals, Accent Colors, Glassmorphism, Elevations, Borders, Corners)
3. Kiểu chữ và cấp bậc hiển thị (Typography, Font-sizes, weights, leading)
4. Hiệu ứng động và chuyển tiếp mượt mà (Micro-interactions, Transitions, Framer motion)
5. Khả năng tương thích thiết bị (Mobile-first responsive) và Accessibility (A11y, ARIA, focus ring)

`;

    if (mode === 'shorten') {
      contents += "Hãy viết một prompt cực kỳ ngắn gọn, súc tích nhưng vẫn giữ đầy đủ các từ khóa kỹ thuật cốt lõi và tiêu chuẩn chất lượng cao nhất.";
    } else if (mode === 'expand') {
      contents += "Hãy viết một prompt cực kỳ chi tiết, mở rộng, phân tích sâu từng góc cạnh thiết kế và tiêu chí chất lượng cao nhất để AI Agent có thể thực hiện hoàn hảo không sai sót.";
    } else {
      contents += "Hãy viết một prompt tối ưu, cân bằng giữa độ chi tiết và tính rõ ràng.";
    }

    const result = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const optimized = result.text;
    if (!optimized) {
      throw new Error("Không nhận được phản hồi từ Gemini API.");
    }

    return res.json({ optimized: optimized.trim() });
  } catch (err: any) {
    console.error("Gemini optimization failed:", err);
    return res.status(500).json({ error: "Tối ưu prompt thất bại: " + err.message });
  }
});

// API route for AI Chat Assistant
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Yêu cầu cung cấp tin nhắn." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `Bạn là Trí Nhân AI - Trợ lý thông minh của chuyên gia Nguyễn Hùng Thái.
Nhiệm vụ của bạn là hỗ trợ người dùng tìm hiểu về hồ sơ năng lực, kinh nghiệm 22 năm và tư duy quản trị của anh Thái.

THÔNG TIN VỀ ANH NGUYỄN HÙNG THÁI (HÀNH TRÌNH 22 NĂM):
- Sinh năm: 1984.
- Kinh nghiệm: 22 năm trong ngành Dịch vụ & Trải nghiệm Khách hàng (CX).
- Các tập đoàn đã qua: Mobifone, V247, Garena (VED), Shopee, Prudential Vietnam, MoMo, Finviet.
- Chuyên môn: Xây dựng hệ thống CSKH, chuẩn hóa quy trình SOP, quản trị dữ liệu, ứng dụng công nghệ/AI trong CX.
- Triết lý: Hiệu quả – Nhân văn – Bền vững. Chữ "THẤU CẢM" là kim chỉ nam.
- Dự án tiêu biểu: Tái cấu trúc hỗ trợ đa kênh tại MoMo (2018-2021).
- Tính cách: Chuyên nghiệp, thực chiến, thấu hiểu, sẵn sàng chia sẻ.

HƯỚNG DẪN TRẢ LỜI:
- Luôn xưng "Trí Nhân" và gọi người dùng là "Anh/Chị" hoặc "Bạn".
- Trả lời lịch sự, chuyên nghiệp nhưng thân thiện.
- Sử dụng kiến thức về anh Thái để trả lời chính xác. Nếu không biết chắc chắn, hãy khéo léo đề nghị người dùng để lại thông tin để anh Thái liên hệ trực tiếp.
- Khuyến khích người dùng xem Hồ sơ năng lực (CV) tại trang web nguyenhungthai.powerservice.one.
- Trả lời bằng Tiếng Việt.`;

    const chatHistory = history || [];
    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction,
      },
      history: chatHistory.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return res.json({ response: result.text });
  } catch (err: any) {
    console.error("Gemini chat failed:", err);
    return res.status(500).json({ error: "Lỗi kết nối AI: " + err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false 
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
