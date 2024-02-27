import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

export const baseURL = 'http://localhost:8080/api';

export const apiRoute = {
    login: '/users/login',
    signup: '/users/signup',
    verify: '/users/verifyAccount',
    user: '/users',
    following: '/users/following',
    follower: '/users/followers',
    s3Url: '/s3/url',
    post: '/posts',
    newsFeed: '/posts/newsFeed',
    comment: '/posts/comments',
    reaction: '/posts/reactions',
    userFeed:'/posts/userFeed',
    globalSearch: '/search/userAndPost',
    marketplace: '/marketplace',
    productsAndServices: '/marketplace/user',
    donation:'/payment/donation',
    cartPayment:'/payment/cart',
    cart: '/cart',
    sellerOrder: '/order/seller',
    buyerOrder: '/order/buyer',
    getAllUsers: '/users/all',
    blockUser: '/users/block',
    unblockUser: '/users/unblock'
}
export const httpMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    patch: 'patch',
    delete: 'delete'
}

export const stripePublicKey='pk_test_51LAdE9C4QiVPITJV6wZm0DmTOjfvROwfZc6FxbJGjtjcshbhsSUtaciQyFcYtmjH7SyFQE2jkgt2fcxh5AxSVsX300773b5kXw';

export const navigationItems = [
    {id: 0, name: 'Play by Play', icon: <GridViewOutlinedIcon/>, route: 'play-by-play', pathName: '/home/play-by-play'},
    {id: 1, name: 'My Products and Services', icon: <InterestsOutlinedIcon/>, route: 'products-and-services', pathName: '/home/products-and-services'},
    {id: 2, name: 'Marketplace', icon: <StorefrontOutlinedIcon/>, route: 'marketplace', pathName: '/home/marketplace'},
    {id: 3, name: 'Orders', icon: <ShoppingBagOutlinedIcon/>, route: 'orders', pathName: '/home/orders'},
];

export const usersNavItem = {
    id: 5, 
    name: 'Users', 
    icon: <GroupsOutlinedIcon/>, 
    route: 'users', 
    pathName: '/home/users'
}

export const modalAction = {
    create: 'create',
    view: 'view',
    edit: 'edit',
}

export const reactionType = {
    unlike: 'unlike',
    like: 'like',
    love: 'love',
    collab: 'collab'
}

export const productCategory = {
    digital: 'digital',
    service: 'service',
    product: 'product'
}

export const role = {
    user: 'user',
    admin: 'admin'
}