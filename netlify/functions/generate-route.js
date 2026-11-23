import { GoogleGenAI, Type } from "@google/genai";

export default async (request) => {
  try {
    const { userPrompt, landmarksInfo } = await request.json();

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Դու Երևանի տուրիստական գիդ ես։ Առկա վայրերն են՝ [${landmarksInfo}]։
      Օգտատիրոջ հարցումը՝ "${userPrompt}"։
      Ընտրիր առավել համապատասխան վայրերի ID-ները ճիշտ հերթականությամբ և գրիր կարճ, հետաքրքիր ուղեցույց հայերենով։`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            routeIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            guideMessage: { type: Type.STRING },
          },
          required: ["routeIds", "guideMessage"],
        },
      },
    });

    return new Response(response.text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = {
  path: "/api/generate-route",
};