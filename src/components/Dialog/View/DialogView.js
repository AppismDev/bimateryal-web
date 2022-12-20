import { ClickAwayListener } from "@mui/material";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  titleSelector,
  contentSelector,
  cancelButtonTextSelector,
  isOpenSelector,
  onPrimaryButtonClickSelector,
  primaryButtonTextSelector,
  closeDialog,
} from "../../DialogContainer/dialogContainerSlice";

export default function DialogView(props) {
  const dispatch = useDispatch();
  const title = useSelector(titleSelector);
  const content = useSelector(contentSelector);
  const primaryButtonTitle = useSelector(primaryButtonTextSelector);
  const cancelButtonTitle = useSelector(cancelButtonTextSelector);
  const onAcceptClick = useSelector(onPrimaryButtonClickSelector);

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        dispatch(closeDialog());
      }}
    >
      <div class="dialog-column">
        <div class="dialog-card">
          <h2>
            <BsInfoCircle style={{ paddingRight: "12px" }} />
            {title ?? ""}
          </h2>
          <p>{content ?? ""}</p>
          <div className="dialog-button-row">
            <button class="dialog-button" onClick={onAcceptClick}>
              {primaryButtonTitle ?? ""}
            </button>
            <button
              class="dialog-button2"
              onClick={() => {
                dispatch(closeDialog());
              }}
            >
              {cancelButtonTitle ?? ""}
            </button>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}
