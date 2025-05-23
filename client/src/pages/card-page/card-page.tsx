import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Typography, Paper, Stack, Box, useTheme, Button} from '@mui/material';
import { invariantId } from '../../utils/utils';
import LoadingBage from '../../components/loading-bage/loading-bage';
import { useFetchCardById } from '../../api/cards-api-queries';
import { useNavigate } from 'react-router';
import { useCardStore } from '../../services/cards/card-store';
import CloseIcon from '@mui/icons-material/Close';

const CardPage = () => {
  const { id } = useParams();
  const { spacing } = useTheme();
  const navigate = useNavigate()
  invariantId(id);
  const { setCardState, name } = useCardStore(state => state);
  const { data, isSuccess, isLoading } = useFetchCardById(id);

  useEffect(() => {
    if (isSuccess) setCardState(data);
  }, [data, isSuccess]);

  return isLoading ? (
    <LoadingBage />
  ) : (
    <Paper sx={{width: '768px', p: spacing(2), borderRadius: spacing(2)}}>
      <Stack direction='row' justifyContent="space-between">
        <Typography variant="h4">{name}</Typography>
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <CloseIcon fontSize="large" />
        </Box>
      </Stack>
      <Stack direction='row' justifyContent="space-between" sx={{marginTop: spacing(2)}}>
        <Stack sx={{width: '512px'}}>
          <Typography variant='h6'>
            Description
          </Typography>
          <Typography variant='h6'>
            Check list placeholder
          </Typography>
        </Stack>
        <Stack sx={{width: '168px'}}>
          <Typography variant='h6'>
            Actions:
          </Typography>
          <Button
            fullWidth={true}
            onClick={() => {}}
          >
            DELETE CARD  
          </Button>
        </Stack>
      </Stack>
   
    </Paper>
  );
};

export default CardPage;
