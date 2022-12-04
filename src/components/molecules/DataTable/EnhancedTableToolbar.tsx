import {
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import { Trash, X } from "react-feather";
import styled from "styled-components";

interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
  onSearchHandler?: (keyword: string | null) => void;
  onDeleteHandler?: () => void;
}

function EnhancedTableToolbar({
  title,
  numSelected,
  onSearchHandler,
  onDeleteHandler,
}: EnhancedTableToolbarProps) {
  const [keyword, setKeyword] = useState("");
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
        : onSearchHandler && (
            <SearchFrame>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                autoComplete="off"
                onChange={({ target }) => setKeyword(target.value)}
                value={keyword}
                onKeyDown={({ key }) => {
                  if (key === "Enter") {
                    onSearchHandler(keyword);
                  }
                }}
                {...(keyword.length > 0
                  ? {
                      InputProps: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setKeyword("");
                                onSearchHandler(null);
                              }}
                            >
                              <X />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }
                  : {})}
              />
            </SearchFrame>
          )}
    </Toolbar>
  );
}

export default EnhancedTableToolbar;

const SearchFrame = styled.div`
  display: contents;
  .MuiTextField-root {
    width: 25vw;
  }
`;
