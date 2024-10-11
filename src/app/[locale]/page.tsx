import ReaderWrapper from "@/components/logic/ReaderLogic/ReaderWrapper";
import ThemeSwitcher from "@/components/logic/ThemeSwitcher";
/* import TestButton from "@/components/TestButton";
 */
export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_0px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex h-full w-full flex-col row-start-2 justify-center items-center">
        <div className="bg-[#7b7481] h-full w-full">
          {/*TODO the above div needs fixing in md+ */}
          <ReaderWrapper />
        </div>
        <div className="absolute left-0 top-0 hidden md:block">
          <ThemeSwitcher />
        </div>
      </main>
    </div>
  );
}
