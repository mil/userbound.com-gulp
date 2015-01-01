if (! this.sh_languages) {
  this.sh_languages = {};
}
sh_languages['bash'] = [
  [
    [
      /\b(workspace.rb)\b/g,
      'sh_keyword',
      -1
    ]
  ]
];
