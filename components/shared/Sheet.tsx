import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface SharedSheetProps {
  title: string;
  children: React.ReactNode;
  Trigger: React.ReactElement;
  description?: string;
  side?: "top" | "bottom" | "left" | "right" | null;
}

export function SharedSheet({
  children,
  title,
  description,
  side = "left",
  Trigger,
}: SharedSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{Trigger}</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
      </SheetContent>
      {children}
    </Sheet>
  );
}
