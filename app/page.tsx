import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex h-full w-full">
			{/* Left Section */}
			<div className="hidden h-full w-3/5 bg-slate-950 p-5 text-white md:block">
				<h1 className="text-2xl">TaskVista</h1>
			</div>

			{/* Right Section */}
			<div className="flex-1">
				<div className="flex h-full items-center justify-center">
					<div className="flex w-[90%] flex-col items-center gap-4">
						{/* Title */}
						<div className="text-2xl font-bold max-md:text-3xl">
							GET STARTED
						</div>

						{/* Buttons */}
						<div className="flex flex-row gap-5 max-md:w-full max-md:flex-col max-md:gap-4 md:w-[90%]">
							{/* Log In Button */}
							<Button className="md:w-1/2" size={"lg"} asChild>
								<Link href={"/auth/login"}>Log In</Link>
							</Button>

							{/* Sign Up Button */}
							<Button className="md:w-1/2" size={"lg"} asChild>
								<Link href={"/auth/signup"}>Sign Up</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
