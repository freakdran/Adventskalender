all_days() 
{
  days=("01" "02" "03" "04" "05" "06" "07" "08" "09" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "20" "21" "22" "23" "24" "25")
  for day in "${days[@]}"
  do
    if [ -s $day/done.js ] && [ -r $day/done.js ]
    then 
      node $day/done.js $@
    else
      echo "No more days done"
      break
    fi
  done
}

one_day() 
{
  day=$@
  length=${#day}
  
  if ! [ $length -eq 2 ] || [ $day -gt 25 ] || [ $day -lt 1 ]
  then 
    echo "Wrong day format"
    echo "EXITING"
    exit 0
  fi

  if [ -s $day/done.js ] && [ -r $day/done.js ]
  then 
    node $day/done.js
  else 
    echo "Day not yet done"
    exit 0
  fi
}

echo "Enter day (like 01) or leave empty for all days"
read num
if test -z "$num"
then 
  echo "Show test output? y/N"
  read tests
  if [ $tests == "y" ]
  then
    echo "Executing all days with test cases"
    all_days true
  else
    echo "Executing all days without test cases"
    all_days false
  fi
else
  one_day $num
fi
