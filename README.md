# usstates

Find words which have no letters in common with a US state.

> Ohio is the only US state which shares no letters with the word mackerel.

This project is my solution to finding other words which share this quality.

## Installation

```sh
$ npm install -g usstates
```

## Use

```sh
$ usstates ohio
>> abasement
>> abatement
>> abbeys
...
```

`usstates` writes to `stdout` so you can pipe it into other utils.

```sh
$ usstates ohio | grep ^ma | less
```

### State names with spaces

Spaces will be stripped from state names automatically. The following commands are equivalent:

```sh
$ usstates 'new york'
$ usstates new york
$ usstates newyork
```

### Case

`usstates` is case insensitive. The following commands are equivalent:

```sh
$ usstates new york
$ usstates New york
$ usstates new York
$ usstates New York
$ usstates NEW YORK
...etc
```

## Options

### -h, --help

Display help information

### -V, --version

Display version information

### -w, --words

By default `usstates` will use the provided [wordlist](https://github.com/j-/usstates/blob/master/lib/words.txt).
This can be overriden with the `words` flag:

```sh
$ usstates --words path/to/words.txt wyoming
$ usstates -w /usr/share/dict/words maine
```