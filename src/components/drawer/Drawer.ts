// import { connect } from 'react-redux';
// 
// import { formatUtils } from '@makemydeal/dr-common-utils';
// import { formatUtils as sharedFormatUtils } from '@makemydeal/dr-platform-shared';
// import { selectors } from '@makemydeal/dr-offer-redux';

// import { config } from '../../../../config';
// import * as dealerSelectors from '../../selectors/dealerSelectors';
// import DrawerUI from './DrawerUI';
// import { IDrawerUIStateProps, IDrawerUIDispatchProps } from './DrawerUI';
// import { IStateTree, OfferType } from '../../../../common/types';

export interface IDrawerProps {
}

// const mapStateToProps = (state: IStateTree, ownProps: IDrawerProps): IDrawerUIStateProps => {
//     const dealerLogo = dealerSelectors.getDealerLogoUrl(state);
//     const result = {
//         dealerName: dealerSelectors.getDealerName(state),
//         dealerLogo
//     };
//     return result;
// };

// const mapDispatchToProps = (dispatch): IDrawerUIDispatchProps => {
//     return {};
// };

// const Drawer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(DrawerUI);

const Drawer = {};

export default Drawer;
