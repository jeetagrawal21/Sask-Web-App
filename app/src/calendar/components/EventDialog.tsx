import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import { getTime } from "date-fns";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { Event, EventColor, eventColors } from "../types/event";

type EventDialogProps = {
  onAdd: (event: Partial<Event>) => void;
  onClose: () => void;
  onDelete: (eventId: string) => void;
  onUpdate: (event: Event) => void;
  open: boolean;
  processing: boolean;
  event?: Event;
};

interface RenderInputParams {
  id: string;
  disabled: boolean;
  fullWidth?: boolean;
  margin?: "none" | "dense" | "normal";
  name: string;
}

type EventFormValues = {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: EventColor;
};

const EventDialog = ({
  onAdd,
  onClose,
  onDelete,
  onUpdate,
  open,
  processing,
  event,
}: EventDialogProps) => {
  const { t } = useTranslation();

  const editMode = Boolean(event && event.id);

  const convertFormValues = (values: EventFormValues): Partial<Event> => {
    return {
      ...values,
      start: getTime(values.start),
      end: getTime(values.end),
    };
  };

  const handleSubmit = (values: EventFormValues) => {
    const newEvent = convertFormValues(values);
    if (event && event.id) {
      onUpdate({ ...newEvent, id: event.id } as Event);
    } else {
      onAdd(newEvent);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: event ? event.title : "",
      description: event ? event.description : undefined,
      start: event ? new Date(event.start) : new Date(),
      end: event ? new Date(event.end) : new Date(),
      color: event ? event.color : "primary",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      description: Yup.string().max(
        100,
        t("common.validations.max", { size: 100 })
      ),
      start: Yup.date().required(t("common.validations.required")),
      end: Yup.date().required(t("common.validations.required")),
      color: Yup.string(),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="event-dialog-title">
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="event-dialog-title">
          {editMode
            ? t("calendar.modal.edit.title") as string
            : t("calendar.modal.add.title") as string}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label={t("calendar.form.title.label") as string }
            name="title"
            autoFocus
            disabled={processing}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label={t("calendar.form.description.label") as string}
            name="description"
            disabled={processing}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <MobileDateTimePicker
            label={t("calendar.form.start.label") as string}
            inputFormat="dd/MM/yyyy H:mm"
            value={formik.values.start}
            onChange={(date: Date | null) =>
              formik.setFieldValue("start", date)
            }
            renderInput={(params: RenderInputParams) => (
              <TextField
                {...params}
                id="start"
                disabled={processing}
                fullWidth
                margin="normal"
                name="start"
              />
            )}
          />
          <MobileDateTimePicker
            label={t("calendar.form.end.label")}
            inputFormat="dd/MM/yyyy H:mm"
            value={formik.values.end}
            onChange={(date: Date | null) => formik.setFieldValue("end", date)}
            renderInput={(params: RenderInputParams) => (
              <TextField
                {...params}
                id="end"
                disabled={processing}
                fullWidth
                margin="normal"
                name="end"
              />
            )}
          />
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">
              {t("calendar.form.color.label") as string }
            </FormLabel>
            <RadioGroup
              row
              aria-label="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
            >
              {eventColors.map((color) => (
                <Radio
                  key={color}
                  disabled={processing}
                  sx={{
                    color: `${color}.main`,
                    "&.Mui-checked": {
                      color: `${color}.main`,
                    },
                  }}
                  value={color}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {event && event.id && (
            <IconButton
              aria-label="delete event"
              onClick={() => onDelete(event.id)}
              disabled={processing}
              size="large">
              <DeleteIcon />
            </IconButton>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose}>{t("common.cancel") as string}</Button>
          <LoadingButton loading={processing} type="submit" variant="contained">
            {editMode
              ? t("calendar.modal.edit.action") as string
              : t("calendar.modal.add.action") as string }
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventDialog;
