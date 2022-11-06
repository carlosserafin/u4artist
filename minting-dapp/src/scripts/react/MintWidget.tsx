import { utils, BigNumber } from 'ethers';
import React from 'react';
import { EventEmitter } from 'stream';
import NetworkConfigInterface from '../../../../smart-contract/lib/NetworkConfigInterface';

interface Props {
  networkConfig: NetworkConfigInterface;
  maxSupply: number;
  setError(error: any): void; 
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isPremintlistMintEnabled: boolean;
  isUserInWhitelist: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number, whitelistTokenId: number): Promise<void>;
  premintlistMintTokens(mintAmount: number): Promise<void>;
}

interface State {
  mintAmount: number;
  whitelistTokenId: number;
}

const defaultState: State = {
  mintAmount: 1,
  whitelistTokenId: 0,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMintAmount = this.handleChangeMintAmount.bind(this);
  }

  handleChange(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount),
      whitelistTokenId: event.target.value,
    });
  }

  handleChangeMintAmount(event: { target: { value: any; }; }) {
    this.props.setError(undefined);
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, event.target.value),
      whitelistTokenId: this.state.whitelistTokenId,
    });
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    /** return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist; */
    return this.props.isWhitelistMintEnabled;
  }

  private canPremintlistMint(): boolean {
    /** return this.props.isWhitelistMintEnabled && this.props.isUserInWhitelist; */
    return this.props.isPremintlistMintEnabled;
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(this.props.maxMintAmountPerTx, this.state.mintAmount + 1),
      whitelistTokenId: this.state.whitelistTokenId,
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    
    if (!this.props.isPaused) {
      await this.props.mintTokens(this.state.mintAmount);

      return;
    }
    await this.props.whitelistMintTokens(this.state.mintAmount, this.state.whitelistTokenId);
  }

  render() {
    let itera1 = 1;
    return (
      <>
        {this.canMint() ?
          <div className="mint-widget">
            <div className="preview">
              <img src="build/images/ack-preview.gif" alt="Collection preview" />
            </div>

            <div className="price">
              <strong>Total price:</strong> {utils.formatEther(this.props.tokenPrice.mul(this.state.mintAmount))} {this.props.networkConfig.symbol}
            </div>

            <div className="controls form-contact">
              {this.canWhitelistMint()?
                <>
                <label className='mint_label'>Provide your CYBERKONGZ GENESIS TOKEN ID to mint a new ASCII CYBER KONGZ:</label><br/>
                <input type='text' placeholder='Token # (e.g. 273)' size={4} maxLength={4} id="whitelist-token-id" onChange={this.handleChange} />
                </>
              :
                <></>
              }
              {this.props.maxMintAmountPerTx>0?
              <div>
                <label className='mint_label'>How many Ascii CyberKongz you want to mint?</label><br/>
                <select id="amountTokensToMint" onChange={this.handleChangeMintAmount}>
                  <option value="1">1 ASCII CyberKong</option>
                  <option value="2">2 ASCII CyberKongz</option>
                  <option value="3">3 ASCII CyberKongz</option>
                  <option value="4">4 ASCII CyberKongz</option>
                  <option value="5">5 ASCII CyberKongz</option>
                </select>
              </div>
              :
              <></>
              }
              <button className="tf-button-st2 btn-effect" onClick={() => this.mint()}><span className="effect">Mint</span></button>
            </div>
          </div>
          :
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            
            {this.props.isWhitelistMintEnabled ? <>You are not included in the <strong>whitelist</strong>.</> : <>The contract is <strong>paused</strong>.</>}<br />
            Please come back during the next sale!
          </div>
        }
      </>
    );
  }
}
