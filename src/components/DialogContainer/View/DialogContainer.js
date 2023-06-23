import React from "react";
import { useSelector } from "react-redux";
import DialogView from "../../Dialog/View/DialogView";
import { isOpenSelector } from "../dialogContainerSlice";

export default function DialogContainer() {
  const isOpen = useSelector(isOpenSelector);

  return <div className="dialog-container">{isOpen && <DialogView />}</div>;
}
