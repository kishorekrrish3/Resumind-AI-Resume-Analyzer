export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    loadPromise = import("pdfjs-dist").then((lib) => {
        // Set the worker source to use the correct path
        // In production, this should point to the worker file in your public folder
        if (typeof window !== 'undefined') {
            lib.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url
            ).toString();
        }
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    }).catch((err) => {
        console.error("Failed to load PDF.js:", err);
        isLoading = false;
        loadPromise = null;
        throw new Error(`Failed to load PDF.js library: ${err.message}`);
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        console.log("Starting PDF conversion for:", file.name);

        // Load PDF.js library
        console.log("Loading PDF.js library...");
        const lib = await loadPdfJs();
        console.log("PDF.js library loaded successfully");

        // Read file as array buffer
        console.log("Reading file as array buffer...");
        const arrayBuffer = await file.arrayBuffer();
        console.log("Array buffer created, size:", arrayBuffer.byteLength);

        // Load PDF document
        console.log("Loading PDF document...");
        const loadingTask = lib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        console.log("PDF loaded, pages:", pdf.numPages);

        // Get first page
        console.log("Getting first page...");
        const page = await pdf.getPage(1);
        console.log("First page retrieved");

        // Create viewport
        const viewport = page.getViewport({ scale: 4 });
        console.log("Viewport created:", viewport.width, "x", viewport.height);

        // Create canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Failed to get 2D context from canvas");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        // Render page to canvas
        console.log("Rendering page to canvas...");
        await page.render({ canvasContext: context, viewport }).promise;
        console.log("Page rendered successfully");

        // Convert canvas to blob
        return new Promise((resolve) => {
            console.log("Converting canvas to blob...");
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        console.log("Blob created successfully, size:", blob.size);
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        console.log("Image file created:", imageFile.name);
                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        console.error("Failed to create blob from canvas");
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob from canvas",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err) {
        console.error("PDF conversion error:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${errorMessage}`,
        };
    }
}