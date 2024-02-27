import { makeStyles, createStyles } from '@mui/styles';
import { toggleBorder as isBorder} from '../../../core/styles/debugging-border';

export const useStylesAuth = makeStyles((theme) =>
createStyles({
    parent: {
        display: 'flex',
        width: '100%', 
        height: '100vh' 
    },
    boxOne: {
        background: '#F8FBFF', 
        height: '100%', 
        width: '55%', 
        position: 'relative', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    controller: {
        height: '100px', 
        width: '100px', 
        top: 0, 
        left: 0
    },
    headphones: {
        height: '190px', 
        width: '190px', 
        right: '40px', 
        top: '30px'
    },
    phone: {
        height: '238px', 
        width: '200px', 
        bottom: 0, 
        right: '40px'
    },
    phoneSmall: {
        height: '188px', 
        width: '160px', 
        bottom: 0, 
        right: '40px'
    },
    spearker: {
        height: '150px', 
        width: '201px', 
        bottom: 0, 
        left: 0
    },
    boxOneStack: {
        border : isBorder ? '1px solid red' : 'none', 
        height: 'fit-content', 
        position: 'relative', 
        width: '420px'
    },
    havenSenseLogo: {
        height: '150px', 
        width: '150px', 
        top: '-50px', 
        left: '-50px'
    },
    havenSenseTxt: {
        marginLeft: '50px', 
        marginTop: '12px', 
        fontWeight: '500', 
        color: ' #44444F'
    },
    boxTwo: {
        background: '#0f1f27', 
        height: '100%', 
        width: '45%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'relative'
    },
    boxTwoStack: {
        border : isBorder ? '1px solid red' : 'none', 
        width: '400px'
    },
    link: {
        textDecoration: 'none', 
        fontWeight: '500',
        // position: 'absolute',
        // bottom: 10,
        // left: 30
    }
}),
);