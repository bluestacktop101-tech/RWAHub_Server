import { useCallback, useId, useRef, useState } from "react";
import { Upload } from "lucide-react";

type FileDropzoneProps = {
  label: string;
  required?: boolean;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  placeholder?: string;
  maxBytes?: number;
};

export function FileDropzone({
  label,
  required,
  accept,
  file,
  onFileChange,
  placeholder = "Upload file or drag and drop here",
  maxBytes = 10 * 1024 * 1024,
}: FileDropzoneProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  const pickFiles = useCallback(
    (list: FileList | null) => {
      const f = list?.[0];
      if (!f) return;
      if (f.size > maxBytes) {
        setHint(`File must be under ${Math.round(maxBytes / (1024 * 1024))} MB.`);
        return;
      }
      setHint(null);
      onFileChange(f);
    },
    [maxBytes, onFileChange],
  );

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-neutral-900">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          pickFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8 text-center transition-colors ${
          dragOver ? "border-neutral-900 bg-neutral-50" : "border-neutral-300 bg-white hover:border-neutral-400"
        }`}
      >
        <Upload className="mb-2 h-8 w-8 text-neutral-400" aria-hidden />
        <span className="text-sm font-medium text-neutral-700">{placeholder}</span>
        <span className="mt-1 text-xs text-neutral-500">
          {accept.includes("pdf") ? "PDF, DOC, DOCX accepted. " : ""}
          Max {Math.round(maxBytes / (1024 * 1024))} MB.
        </span>
        {file ? (
          <span className="mt-3 max-w-full truncate text-sm font-medium text-neutral-900">{file.name}</span>
        ) : null}
        {file ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFileChange(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="mt-2 text-xs font-medium text-neutral-600 underline-offset-2 hover:underline"
          >
            Remove file
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(e) => pickFiles(e.target.files)}
      />
      {hint ? <p className="mt-1.5 text-xs text-red-600">{hint}</p> : null}
    </div>
  );
}
