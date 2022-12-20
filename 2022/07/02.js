const fs = require('fs');

class File {
  constructor(name, size) {
    this.name = name;
    this._size = size;
  }

  size() {
    return this._size;
  }
}

class Dir {
  constructor(name, parentDir) {
    this.isDir = true;
    this.parentDir = parentDir;
    this.name = name;
    this.contents = [];
  }

  size(ignore) {
    if (ignore === this) {
      return 0;
    }
    return this.contents.map((v) => v.size(ignore)).reduce((a, b) => a + b, 0);
  }
}

class Filesystem {
  constructor(instructions) {
    this.rootDir = new Dir('/', null);
    this.build(instructions);
  }

  size(ignore) {
    return this.rootDir.size(ignore);
  }

  build(instructions) {
    let currentDir = this.rootDir;
    for (let line of instructions) {
      if (line.startsWith('$ cd')) {
        const [, dir] = /\$ cd (.+)$/.exec(line);
        if (dir === '/') {
          currentDir = this.rootDir;
        } else if (dir === '..') {
          currentDir = currentDir.parentDir;
        } else {
          currentDir = currentDir.contents.find(
            (v) => v.isDir && v.name === dir
          );
        }
      } else if (line.startsWith('$ ls')) {
        continue;
      } else {
        // In a `ls` output
        if (line.startsWith('dir ')) {
          const [, dirName] = /dir (.+)$/.exec(line);
          const newDir = new Dir(dirName, currentDir);
          currentDir.contents.push(newDir);
        } else {
          // file
          let [, size, fileName] = /(\d+) (.+)$/.exec(line);
          size = parseInt(size, 10);

          const newFile = new File(fileName, size);
          currentDir.contents.push(newFile);
        }
      }
    }
  }

  static *walk(dir) {
    for (let c of dir.contents) {
      yield c;
      if (c.isDir) {
        yield* Filesystem.walk(c);
      }
    }
  }

  *[Symbol.iterator]() {
    yield* Filesystem.walk(this.rootDir);
  }
}

function main(filename) {
  const input = fs
    .readFileSync(`${__dirname}\\${filename}`, { encoding: 'utf8' })
    .split('\r\n');
  const drive = new Filesystem(input);
  const dirs = [...drive].filter((v) => v.isDir);

  const totalSpace = 70000000;
  const neededSpace = 30000000;
  const spaceLeft = totalSpace - drive.rootDir.size();
  const spaceToFree = neededSpace - spaceLeft;

  let bigEnoughDirs = [drive.rootDir];

  for (let dir of dirs) {
    let dirSize = dir.size();
    if (dirSize >= spaceToFree) {
      bigEnoughDirs.push(dir);
    }
  }

  bigEnoughDirs.sort((a, b) => {
    return a.size() - b.size();
  });

  return bigEnoughDirs[0].size();
}

function run(showTest = 1) {
  if (showTest) console.log('  Test: ', main('testInput.txt'));
    console.log('  Real: ', main('input.txt'));
}

module.exports = {
  run,
};
