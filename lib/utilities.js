function clone(o) {
  function F() {}
  F.prototype = o;
  return new F();
}