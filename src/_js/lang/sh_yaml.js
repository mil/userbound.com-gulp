if (! this.sh_languages) {
  this.sh_languages = {};
}
//sh_keyword, sh_preproc sh_type
sh_languages['yaml'] = [
  [
    [
      /^.+\:/g,
      'sh_string',
      -1
    ]
  ]
];
