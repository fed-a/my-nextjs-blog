import React from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

export function UiKitDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Войти</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Логин</div>
          <div>Пароль</div>
        </div>
        <DialogFooter>
          <Button type="submit">Войти</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
