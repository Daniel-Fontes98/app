import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ModalProps {
  title: string;
  date: string;
  time: string;
  description: string | null;
}

const Modal = (props: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{props.title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Data</Label>
            <div>{props.date}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Hora</Label>
            <div>{props.time}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Descrição</Label>
            <div>{props.description}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
