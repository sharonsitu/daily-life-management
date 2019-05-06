import React, { Component } from 'react';
import EmojiPicker from 'emoji-picker-react';
import Emoji from 'react-emoji-render';
import './dailystory.css';

class DailyStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showInputBox: true,
          showStoryBox: false,
          showEmojiPick: false,
          inputtext: ''
        };
        this.handleClickEmoji = this.handleClickEmoji.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectEmoji = this.handleSelectEmoji.bind(this);
        this.submitStory = this.submitStory.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleClickEmoji() {
        this.setState({
            showEmojiPick: !this.state.showEmojiPick,
        })
    }

    handleInputChange(event) {
        this.setState({
            inputtext: event.target.value
        })
    }

    handleSelectEmoji(code,emoji) {
        let emojitext = ':'+emoji.name+':';
        this.setState({
            inputtext: this.state.inputtext+emojitext
        })
    }

    submitStory(event) {
        event.preventDefault();
        this.setState({
            showInputBox: false,
            showStoryBox: true,
        })
    }

    handleEdit(event) {
        event.preventDefault();
        this.setState({
            showInputBox: true,
            showStoryBox: false,
        })
    }

    render() {
      console.log(this.state.inputtext)
      return (
        <div className="dailystory-container">
            <div className="dailystory-title">
                <div>Write down your little story</div>
                <i class="far fa-edit"></i>
            </div>
            {this.state.showInputBox ? 
            <div className="input-box">
                <form>
                    <div className="input-box-container">
                        <textarea placeholder="Type anything you wnat to share here, and you can select Emoji at the bottom..." value={this.state.inputtext} onChange={this.handleInputChange} className="input-box-text" type="text" name="name" />
                        <div className="controls">
                            <i onClick={this.handleClickEmoji} className="emoji-icon far fa-laugh-squint"></i>
                            <button onClick={this.submitStory}>submit</button>
                        </div>  
                    </div>
                </form>
                {this.state.showEmojiPick ? <EmojiPicker onEmojiClick={this.handleSelectEmoji}/> : ''}
            </div>
            : ''}
            {this.state.showStoryBox ?
            <div className="story-container">
                <Emoji className="mystory" text={this.state.inputtext} />
                <button onClick={this.handleEdit}>edit</button>
            </div>
            : ''}
        </div>
      );
    }
  }
  
  export default DailyStory;