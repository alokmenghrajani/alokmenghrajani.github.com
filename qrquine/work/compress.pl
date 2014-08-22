while (<>) {
  $_ =~ s/^\s+//; # remove spaces at beginning of line
  $_ =~ s%\s*//.*%%; # remove comments
  $_ =~ s/\n//m;  # remove newlines
  print $_;
}
