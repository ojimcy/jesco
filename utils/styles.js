import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#ffffff',
      marginLeft: 25,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  formMain: {
    width: '100%',
    margin: '0 auto',
    '& button': { color: '#ffffff', fontSize: 18 },
  },
  link: {
    color: '#f0c000',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
  checkoutWizzard: {
    backgroundColor: 'transparent',
    marginTop: 15,
  },
  error: {
    color: 'f04040',
  },
  fullWidth: {
    width: '100%',
  },
});
export default useStyles;
