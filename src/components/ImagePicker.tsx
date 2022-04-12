import React from "react";
import styles from "../styles/image-picker.scss";
import { classes } from "../util/classes.util";
import { file2Base64 } from "../util/file.util";
import { Button } from "./Button";
import { ReactComponent as Spinner } from "../assets/icon/spinner.svg";
import { useInlineStyle } from "../hooks/useInlineStyle.hook";
import { formatIntlMessage } from "../registry/intl/intl";

interface Props {
  imageB64?: string;
  onChange: (imageB64: string) => void;
}

export const ImagePicker = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [loading, setLoading] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const styleVars = useInlineStyle(
    () => ({
      "--selected-image":
        !loading && props.imageB64 ? `url("${props.imageB64}")` : undefined,
    }),
    [loading, props.imageB64]
  );

  const onFileSelected = (file: File) => {
    setLoading(true);
    file2Base64(file)
      .then(props.onChange)
      .finally(() => {
        setLoading(false);
        setHovering(false);
      });
  };

  const onDragHover = (hovered: boolean) => (event: React.DragEvent) => {
    if (props.imageB64) return;
    event.stopPropagation();
    event.preventDefault();
    setHovering(hovered);
  };

  const onFileDrop: React.DragEventHandler = (event) => {
    if (props.imageB64) return;
    event.stopPropagation();
    event.preventDefault();
    const selectedFile = event.dataTransfer.files[0];
    if (!selectedFile) return;
    onFileSelected(selectedFile);
  };

  const onSelect: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    onFileSelected(selectedFile);
  };

  const reset = () => {
    props.onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onSelect={onSelect}
        onChange={onSelect}
      />

      <div
        className={classes(
          styles.dropzone,
          hovering && styles["dropzone--hovering"]
        )}
        style={styleVars}
        onDrop={onFileDrop}
        onDragEnter={onDragHover(true)}
        onDragOver={onDragHover(true)}
        onDragLeave={onDragHover(false)}
      >
        {loading ? (
          <React.Fragment>
            <span className={styles.dropzone__status}>
              {formatIntlMessage("papereditor.picker.loading")}
            </span>
            <Spinner className={styles.dropzone__spinner} />
          </React.Fragment>
        ) : (
          !props.imageB64 && (
            <React.Fragment>
              <span className={styles.dropzone__status}>
                {formatIntlMessage("papereditor.picker.no-image")}
              </span>
              <span className={styles.dropzone__hint}>
                {formatIntlMessage("papereditor.picker.drag-drop-here")}
              </span>
              <span className={styles.dropzone__hint}>
                {formatIntlMessage("papereditor.picker.or")}
              </span>
              <Button onClick={() => inputRef.current?.click()}>
                {formatIntlMessage("papereditor.picker.click-here")}
              </Button>
            </React.Fragment>
          )
        )}
      </div>

      {!loading && props.imageB64 && (
        <div className={styles.actions}>
          <Button onClick={() => inputRef.current?.click()}>
            {formatIntlMessage("papereditor.picker.upload-again")}
          </Button>
          <Button bgColor="#E34646" onClick={reset}>
            {formatIntlMessage("papereditor.picker.clear")}
          </Button>
        </div>
      )}
    </div>
  );
};
