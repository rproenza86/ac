// import { connect } from 'react-redux';
// 
// import { formatUtils } from '@makemydeal/dr-common-utils';
// import { formatUtils as sharedFormatUtils } from '@makemydeal/dr-platform-shared';
// import { selectors } from '@makemydeal/dr-offer-redux';

// import { config } from '../../../../config';
// import * as dealerSelectors from '../../selectors/dealerSelectors';
// import HeaderUI from './HeaderUI';
// import { IHeaderUIStateProps, IHeaderUIDispatchProps } from './HeaderUI';
// import { IStateTree, OfferType } from '../../../../common/types';

export interface IHeaderProps {
}

// const mapStateToProps = (state: IStateTree, ownProps: IHeaderProps): IHeaderUIStateProps => {
//     const dealerLogo = dealerSelectors.getDealerLogoUrl(state);
//     const result = {
//         dealerName: dealerSelectors.getDealerName(state),
//         dealerLogo
//     };
//     return result;
// };

// const mapDispatchToProps = (dispatch): IHeaderUIDispatchProps => {
//     return {};
// };

// const Header = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(HeaderUI);

const Header = {};

export default Header;
