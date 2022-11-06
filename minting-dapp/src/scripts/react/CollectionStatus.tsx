import React from 'react';

interface Props {
  userAddress: string|null;
  totalSupply: number;
  maxSupply: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isPremintlistMintEnabled: boolean;
  isUserInWhitelist: boolean;
}

interface State {
}

const defaultState: State = {
};

export default class CollectionStatus extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private isSaleOpen(): boolean
  {
    return this.props.isWhitelistMintEnabled || !this.props.isPaused;
  }

  render() {
    return (
      <>
        <div className="collection_status">
          <div className="user_address">
            <span className="label">Wallet address:</span>
            <span className="address">{this.props.userAddress}</span>
            <p>&nbsp;</p>
          </div>
          
          <div className="supply">
            <span className="label">Supply: </span>
            {this.props.totalSupply < this.props.maxSupply ? 
              <span className='sale_status_open'>
                {this.props.totalSupply} / {this.props.maxSupply}
              </span>
             : 
              <span className='sale_status_close'>
                SOLD OUT
              </span>
            }
            <p>&nbsp;</p>
          </div>

          <div className="current_sale">
            <span className="label">Sale status: </span>
            {this.isSaleOpen() ?
              <span className='sale_status_open'>
                {this.props.isWhitelistMintEnabled ? 'Whitelist only' : 'Open'}
              </span>
              :
              <span className='sale_status_close'>
              Closed
              </span>
            }
          </div>
        </div>
      </>
    );
  }
}
