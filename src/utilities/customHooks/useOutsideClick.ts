import React from "react";

export function useOutsideClick(ref: any, onClickOut: () => void) {
    React.useEffect(() => {
        const onClick = ({ target }: any) => !ref.current.contains(target) && onClickOut?.()
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);
}