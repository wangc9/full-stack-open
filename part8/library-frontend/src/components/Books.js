import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {ArrowDropDown} from '@mui/icons-material';
import {useQuery} from '@apollo/client';
import {ALL_BOOKS, ALL_GENRES} from './queries';
import {useRef, useState} from 'react';

const Books = () => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectGenre, setSelectGenre] = useState(null);
  const result = useQuery(ALL_BOOKS);
  const genres = useQuery(ALL_GENRES);
  if (result.loading) {
    return <div>loading...</div>;
  };
  if (genres.loading) {
    return <div>loading...</div>;
  };
  const books = result.data.allBooks;
  console.log(books);
  const genre = genres.data.allGenres.concat('all');
  console.log(genre);

  const handleClick = () => {
    setSelectGenre(genre[selectedIndex]);
    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre
        {' '}
        <div>
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button onClick={handleClick}>{genre[selectedIndex]}</Button>
            <Button
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDown />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {genre.map((gen, index) => (
                        <MenuItem
                          key={gen}
                          // disabled={index === 2}
                          selected={index === selectedIndex}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {gen}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell> </TableCell>
            <TableCell><b>author</b></TableCell>
            <TableCell><b>published</b></TableCell>
          </TableHead>
          <TableBody>
            {(selectGenre === 'all' ? books : books.filter((book) => book.genres.includes(selectGenre))).map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author.name}</TableCell>
                <TableCell>{book.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Books;
