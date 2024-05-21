import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignInWithGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <Button
              onClick={handleSignInWithGoogle}
              className="my-4 bg-red-600 text-white hover:bg-red-700"
            >
              Login com Google
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <DialogTrigger>
        <Button onClick={() => setIsOpen(true)}>Abrir</Button>
      </DialogTrigger>
    </>
  );
};

export default LoginModal;
