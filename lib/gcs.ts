import { Storage } from "@google-cloud/storage";

const createWriteStream = (
  bucket_name: string,
  filename: string,
  contentType?: string
) => {
  const credentials = JSON.parse(
    Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS!, "base64")
      .toString()
      .replace(/\n/g, "")
  );
  const storage = new Storage({
    projectId: credentials.project_id,
    credentials: credentials,
  });
  const bucket = storage.bucket(bucket_name);

  const ref = bucket.file(filename);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: contentType,
  });
  // stream.on("finish", () => {
  //   ref.makePublic();
  // });

  return stream;
};

export const putBuffer = async (
  bucket_name: string,
  filename: string,
  type: string,
  buffer: Buffer
): Promise<string> => {
  const writeStream = createWriteStream(bucket_name, filename, type);
  const copyPromise = new Promise<string>((resolve, reject) => {
    writeStream.on("error", (reason) => {
      reject(reason);
    });
    // writeStream.on('error', reject);
    writeStream.on("finish", () => {
      resolve("https://storage.googleapis.com/" + bucket_name + "/" + filename);
    });
    writeStream.write(buffer);
    writeStream.end();
  });
  return copyPromise;
};

export const putFile = async (
  bucket_name: string,
  filename: string,
  file: File
): Promise<string> => {
  const writeStream = createWriteStream(bucket_name, filename, file.type);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const copyPromise = new Promise<string>((resolve, reject) => {
    writeStream.on("error", (reason) => {
      reject(reason);
    });
    // writeStream.on('error', reject);
    writeStream.on("finish", () => {
      resolve("https://storage.googleapis.com/" + bucket_name + "/" + filename);
    });
    writeStream.write(buffer);
    writeStream.end();
  });
  return copyPromise;
};
