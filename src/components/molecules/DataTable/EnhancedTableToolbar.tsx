import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Filter, Trash } from "react-feather";

interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
  onFilterHandler?: () => void;
  onDeleteHandler?: () => void;
}

function EnhancedTableToolbar({
  title,
  numSelected,
  onFilterHandler,
  onDeleteHandler,
}: EnhancedTableToolbarProps) {
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
          {numSelected}개 선택
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
      {numSelected > 0
        ? onDeleteHandler && (
            <Tooltip title="Delete">
              <IconButton onClick={onDeleteHandler}>
                <Trash />
              </IconButton>
            </Tooltip>
          )
        : onFilterHandler && (
            <Tooltip title="Filter list">
              <IconButton onClick={onFilterHandler}>
                <Filter />
              </IconButton>
            </Tooltip>
          )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
