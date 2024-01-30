
import { NewBoardButton } from './buttons';

export async function Sidebar() {
    return (
        <div className="h-full w-[18rem] border-r px-2 max-md:hidden">
            <div className="flex h-20 items-center justify-center">
                <p className="text-2xl font-semibold">Task Vista</p>
            </div>
            <div>
                {/* <h2 className="px-5">ALL BOARDS({boards.length})</h2>
                <Each
                    of={boards}
                    render={(board, index) => (
                        <ActiveLink key={index} href={board.id.toString()}>
                            <SidebarIcon />
                            <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                                {board.name}
                            </p>
                        </ActiveLink>
                    )}
                /> */}
                <NewBoardButton />
            </div>
        </div>
    );
}
