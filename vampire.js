class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }
  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let curr = this;
    while (curr !== null && curr.creator !== null) {
      curr = curr.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisVampDist = this.numberOfVampiresFromOriginal;
    const otherVampDist = vampire.numberOfVampiresFromOriginal;
    //the closer the dist the more seniro
    if (otherVampDist > thisVampDist) { return true }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    //easy cases
    if (this.offspring === vampire || this === vampire) {
      return this;
    } else if (this.creator === vampire) {
      return vampire;
    }

    //different branch --> root
    let found = false;
    let currOffspring = this.offspring;
    let currCreator = this.creator;
    let root = this;

    let find = this.findVamp(currOffspring, vampire);
    if (find) {
      return this;
    }

    while (currCreator !== null) {

      if (currCreator === vampire) {
        return vampire
      }
      if (currCreator.offspring.length > 1) {

        find = this.findVamp(currCreator.offspring, vampire);
        if (find) {
          return currCreator;
        }
      }
      root = currCreator;
      currCreator = currCreator.creator;
    }
    return root;
  }

  findVamp(vamps, key) {
    let result = null;
    for (const vamp of vamps) {
      if (vamp.name === key.name) {
        return result = vamp.creator;
      }

      if (Array.isArray(vamp.offspring)) {
        let vampOff = vamp.offspring;
        result = this.findVamp(vampOff, key);
        if (result !== null) {
          return result;
        }
      }
    }
    return result;
  }

  findRoot() {
    let curr = this;
    while (curr !== null && curr.creator !== null) {
      curr = curr.creator;
    }
    return curr;
  }

  findVampWithName(root, name) {
    let result = null;
    if (root.name === name) {
      return root;
    }

    if (root.offspring !== []) {
      for (const vamp of root.offspring) {
        if (vamp.name === name) {
          console.log(`vamp found is ${vamp.name} and name is ${name}`);
          return vamp;
        }
        result = this.findVampWithName(vamp, name);
        if (result !== null) {
          return result;
        }
      }
    }
    return result;
  }

  // Returns the vampire object with that name, or null if no vampire exists with that name 
  // within the branch!
  vampireWithName(name) {
    // let root = this.findRoot();
    return this.findVampWithName(this, name);
  }



  // Returns the total number of vampires that exist
  get totalDescendents() {
    let result = 0;
    if (this.offspring !== []) {
      for (const vamp of this.offspring) {
        result += vamp.totalDescendents + 1;
      }
    }
    return result;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let arr = [];
    if (this.yearConverted > 1980) {
      arr.push(this);
    }
    if (this.offspring !== []) {
      for (const vamp of this.offspring) {
        let temp = vamp.allMillennialVampires;
        if (temp.length > 0) {
          arr.push(temp);
        }
      }
    }
    return arr.flat();
  }
}

module.exports = Vampire;

