import ReaderWrapper from "@/components/logic/ReaderWrapper";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-20 pb-20 gap-8 sm:gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-full w-full flex-col gap-4 sm:gap-8 row-start-2 justify-center items-center">
        <ReaderWrapper />
      </main>
    </div>
  );
}
