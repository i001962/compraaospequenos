import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    color: theme.palette.primary.contrastText,
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      paddingTop: 60,
      paddingBottom: 100,
    },

    [theme.breakpoints.up('md')]: {
      maxHeight: 1300,
      minHeight: 500,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(119.21deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 96.67%)`,
      backgroundBlendMode: 'screen, normal',
      zIndex: 5,
      opacity: 0.75,
    },
  },

  content: {
    position: 'relative',
    zIndex: 10,
  },

  button: {
    marginTop: 40,
    padding: '20px 40px',
    backgroundColor: theme.palette.primary.contrastText,
    borderRadius: 60,
    color: theme.palette.primary.dark,
    fontSize: 24,
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      padding: '12px 24px',
      fontSize: 18,
    },

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },

  title: {
    fontWeight: 700,

    [theme.breakpoints.down('sm')]: {
      fontSize: 36,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },

  subtitle: {
    margin: '20px auto',

    [theme.breakpoints.up('md')]: {
      margin: '40px auto',
    },
  },

  fold: {
    position: 'absolute',
    zIndex: 20,
    left: '50%',
    bottom: -4,
    height: 64,
    maxWidth: 980,
    width: 'calc(100% - 80px)',
    transform: 'translateX(-50%)',
    borderRadius: '20px 20px 0 0',
    background: theme.palette.background,

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 64px)',
      height: 48,
    },
  },

  innerFold: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    color: theme.palette.text.hint,
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));
