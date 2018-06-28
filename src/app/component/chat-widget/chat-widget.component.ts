/**
 * @license
 * Copyright Stbui All Rights Reserved.
 */

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

const randomMessages = [
  'Quando você está bem, você só pode trabalhar para si mesmo, não para ganhar dinheiro, mas para se exercitar.',
  'O tempo está bom hoje, boas-vindas a novas pessoas.',
  'Você está se escondendo há tanto tempo e agora está finalmente no meio da multidão.'
];
const rand = max => Math.floor(Math.random() * max);
const getRandomMessage = () => randomMessages[rand(randomMessages.length)];
@Component({
  selector: 'stbui-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  @ViewChild('bottom') bottom: ElementRef;

  visible = false;

  operator = {
    name: 'User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/women/${rand(100)}.jpg`
  };

  client = {
    name: 'User 2',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`
  };

  messages = [];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.addMessage(
        this.operator,
        '您好，欢迎光临，很高兴为您服务！',
        'received'
      );
    }, 1500);
  }

  addMessage(from, text, type: 'received' | 'sent') {
    this.messages.unshift({
      from,
      text,
      type,
      date: new Date().getTime()
    });
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView();
    }
  }

  randomMessage() {
    this.addMessage(this.operator, getRandomMessage(), 'received');
  }

  sendMessage({ message }) {
    if (message.trim() === '') {
      return;
    }
    this.addMessage(this.client, message, 'sent');
    setTimeout(() => this.randomMessage(), 1000);
  }

  toggleChat() {
    this.visible = !this.visible;
  }

  onSubmit() {
    const message = this.getMessage();
    if (message.trim() === '') {
      return;
    }

    this.sendMessage({ message });
    this.clearMessage();
    this.focusMessage();
  }

  getMessage() {
    return this.message.nativeElement.value;
  }

  focusMessage() {
    this.message.nativeElement.focus();
  }

  clearMessage() {
    this.message.nativeElement.value = '';
  }
}
