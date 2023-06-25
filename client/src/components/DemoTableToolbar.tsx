import { Toolbar, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
interface DemoTableToolbarProps {
  numSelected: number;
  title: string;
  onEditCard: (value: any) => void;
  onDeleteCard: () => void;
}
function DemoTableToolbar(props: DemoTableToolbarProps) {
  const { numSelected, title, onEditCard, onDeleteCard } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <>
          <div className="mr-4">
            <Tooltip title="Edit">
              <IconButton onClick={() => onEditCard("edited")}>
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Tooltip title="Delete">
            <IconButton onClick={() => onDeleteCard()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </Toolbar>
  );
}
export default DemoTableToolbar;
