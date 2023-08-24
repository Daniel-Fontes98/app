import type { NextApiRequest, NextApiResponse } from "next";
import { parseForm } from "~/lib/parse-form";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string | string[];
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }

  try {
    const { files } = await parseForm(req);
    const file = files.media;
    const url = Array.isArray(file)
      ? file.map((f) => f.filepath)
      : //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        file!.filepath;

    res.status(200).json({
      data: {
        url,
      },
      error: null,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
