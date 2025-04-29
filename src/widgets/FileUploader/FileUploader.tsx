import { useState, useRef, memo } from "react";
import { Button } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FileStatus, FileUploaderProps } from "@/shared/types/skills";

export const FileUploader = memo(({ onFileUpload }: FileUploaderProps) => {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setFiles((prev) => [...prev, { name: file.name, status: "loading" }]);

      try {
        // Проверка типа файла
        if (file.name.toLowerCase().endsWith(".pdf")) {
          throw new Error("PDF файлы не поддерживаются");
        }

        // Имитация загрузки файла
        await new Promise((resolve) => setTimeout(resolve, 30000));

        // Обновляем статус файла на успешный
        setFiles((prev) =>
          prev.map((f) => (f.name === file.name ? { ...f, status: "idle" } : f))
        );

        if (onFileUpload) {
          onFileUpload(file);
        }
      } catch (error) {
        // Обновляем статус файла на ошибку
        console.log("Ошибка загрузки файла:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Ошибка загрузки";
        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name
              ? { ...f, status: "error", error: errorMessage }
              : f
          )
        );
      }
    }

    // Очищаем input для возможности повторной загрузки тех же файлов
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (fileName: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
  };

  return (
    <div className="mt-8 p-4 border-2 border-primary rounded-[12px]">
      <input
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        ref={fileInputRef}
      />
      <Button onClick={() => fileInputRef.current?.click()} className="mb-4">
        Загрузить файлы
      </Button>

      <div className="flex flex-col gap-2 mt-[30px]">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between p-2 bg-white border-2 border-primary rounded-[12px] bg-opacity-10 rounded"
          >
            <div className="flex items-center gap-2">
              <span>{file.name}</span>
              {file.status === "loading" && (
                <span className="text-[color:var(--color-primary)]">
                  Загрузка...
                </span>
              )}
              {file.status === "error" && (
                <span className="text-red-500">{file.error}</span>
              )}
            </div>
            <Button variant="soft" onClick={() => handleDelete(file.name)}>
              <Cross2Icon fill="red" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
});

FileUploader.displayName = "FileUploader";
