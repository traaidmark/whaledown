# whaledown

A tiny api that renders markdown files to json, caches them, and exposes them over a REST api.

## Installation

The simplest way to get this fish swimming along is:

`git clone https://github.com/traaidmark/whaledown [DIR] && cd [DIR] && rm .git .gitignore`

## Content

Firstly, the recommended practise is to separate your content from this server entirely. Basically something like:

- www
  - app root
  - whaledown
  - app data