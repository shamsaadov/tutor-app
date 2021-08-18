import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickVariant('success')}>Вы приобрели подписку</Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp />
    </SnackbarProvider>
  );
}