import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useDebounce from '../../../core/utils/debounce';
import { httpMethod, apiRoute } from '../../../core/constants/constants';
import { useSelector } from 'react-redux';
import { catchAsync } from '../../../core/utils/catchAsync';
import { api as axios } from '../../../core/utils/interceptor';
import { useNavigate } from 'react-router-dom';
import PostModalComponent from '../../../shared/components/postModal/postModal';
import { modalAction } from '../../../core/constants/constants';

export default function SearchBar() {
  const theme = useTheme();
  const dialogRef = React.useRef();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const token = useSelector((state) => state.userSlice.token);
  const [search, setSearch] = React.useState('');
  const debounce = useDebounce(search, 600);
  const [suggestion, setSuggestion] = React.useState([]);
  const onCloseHandler = (event, action) => {
    if (action === 'selectOption') {
      // selected option from search
      const option = suggestion[event.target.dataset.optionIndex];
      if (option.groupBy === 'People') {
        navigate(`profile/${option._id}`);
      } else if (option.groupBy === 'Posts') {
        dialogRef.current.handleClickOpen(modalAction.view, option);
      };
    }
  }

  React.useEffect(() => {
    if (!debounce) return;
    let searchApi = catchAsync(async () => {
      const res = await axios({
          method: httpMethod.get,
          url: apiRoute.globalSearch+`/${debounce}`,
          headers: {Authorization: `Bearer ${token}`},
      });
      //console.log(res.data.data);
      let users = res.data.data.users.map((x) => {return {...x, groupBy: 'People'}});
      let posts = res.data.data.posts.map((x) => {return {...x, groupBy: 'Posts'}});
      setSuggestion([...users, ...posts]);
    });
    searchApi();
  }, [debounce, token]);

  return (
    <React.Fragment>
      <Autocomplete
      id="grouped-demo"
      options={suggestion}
      groupBy={(option) => option.groupBy}
      getOptionLabel={(option) => option.groupBy === 'People' ? option.name : option.description}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.groupBy === 'People' ? option.name : option.description}
          </li>
        );
      }}
      onClose={(e, a) => onCloseHandler(e, a)}
      renderInput={(params) => 
        <TextField {...params}
        value={search}
        onChange={ e => setSearch(e.target.value)}
        placeholder='Search ...'
        />
      }
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      size='small'
      sx={{ width: matchesMobile ? 120 : 200, ml: matchesMobile ? 5 : 3 }}
      />
      <PostModalComponent ref={dialogRef}/>
    </React.Fragment>
  );
}