import { makeStyles, createStyles } from '@mui/styles';
import { DarkTheme } from '../../../core/styles/themes/dark-theme';
import { toggleBorder as isBorder} from '../../../core/styles/debugging-border';

export const useStylesLogin = makeStyles((theme) =>
createStyles({
    parent: {
        border: isBorder ? '1px solid yellow' : 'none',
        width: '100%', 
    },
    button: {
        fontSize: 'smaller', 
        borderRadius: '1rem',
    },
    socialMedia: {
        height: '50px', 
        width: '50px', 
        position: 'relative'
    },
    border: {
        borderBottom: `1px solid ${DarkTheme.palette.primary.main}`, 
        width: '40%'
    },
    link: {
        textDecoration: 'none', 
        fontWeight: '500'
    }
}),
);