import { utils, BigNumber } from 'ethers';
import React from 'react';
import { EventEmitter } from 'stream';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  userAddress: string|null;
  networkConfig: NetworkConfigInterface;
  setError(error: any): void; 
  isClaimRoyaltiesOpen: boolean;
  royaltiesToClaim: BigNumber;
  claimRoyalties(claimAmount: BigNumber): Promise<void>;
}

interface State {
  royaltiesClaimAmount: BigNumber;
}

const defaultState: State = {
  royaltiesClaimAmount: BigNumber.from(0),
};

export default class ClaimWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
    this.setState({
      royaltiesClaimAmount: props.royaltiesToClaim,
    });
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    console.log('value to claim: ' + utils.parseEther(event.target.value));
    this.setState({
      royaltiesClaimAmount: utils.parseEther(event.target.value),
    });
  }

  private canClaimRoyalties(): boolean {
    return this.props.isClaimRoyaltiesOpen;
  }

  private async claimRoyalties(): Promise<void> {

    console.log('claim royalties: ' + this.state.royaltiesClaimAmount);
    
    if (this.props.isClaimRoyaltiesOpen) {
      await this.props.claimRoyalties(this.state.royaltiesClaimAmount);

      return;
    }
  }

  render() {
    return (
      <>
        {this.canClaimRoyalties() ?
          <div className="mint-widget">
            <hr />
            <h5 className="sub-title">The firts NFT Collection that returns 100% of trading royalties to owners.</h5>
            <div className="price">
              Max balance to claim for address <strong>{this.props.userAddress}</strong>: <span className='mint_label'>{utils.formatEther(this.props.royaltiesToClaim)} {this.props.networkConfig.symbol}</span>
            </div>

            <div className="controls form-contact">
              <label className='mint_label'>Type the amount to claim:</label><br/>
              <input type='text' placeholder='' maxLength={10} id="amount-to-claim" onChange={this.handleChange} defaultValue={utils.formatEther(this.props.royaltiesToClaim)} />
              <button className="tf-button-st2 btn-effect" onClick={() => this.claimRoyalties()}><span className="effect">Claim royalties</span></button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            The claim royalties process is paused, please come back later.
          </div>
        }
      </>
    );
  }
}
