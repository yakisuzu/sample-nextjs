import React, { FC, ReactNode, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export type MessageType = "info" | "success" | "warning" | "error";

export type NoticeProps = {
  showProgress<T>(f: () => Promise<T>): Promise<T>;
  showMessage(type: MessageType, message: string): void;
};

type Props = { render: (notice: NoticeProps) => ReactNode };
export const Notice: FC<Props> = ({ render }: Props) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(false);

  function showProgress<T>(f: () => Promise<T>): Promise<T> {
    setProgress(true);
    return f().finally(() => setProgress(false));
  }

  const { enqueueSnackbar } = useSnackbar();

  function showMessage(type: MessageType, message: string): void {
    enqueueSnackbar(message, {
      variant: type,
    });
  }

  // TODO ダイアログなどもラップし、オプションをコントロールしやすくしておく

  const notice = { showProgress, showMessage };

  return (
    <>
      {render(notice)}
      <Backdrop className={classes.backdrop} open={progress}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
