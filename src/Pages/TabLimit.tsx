import { FormControlLabel, Grid, Slider, Switch, Typography } from '@material-ui/core'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { TabLimitContainer } from '../Assets/Styled';
import Storage from '../Services/Storage';

const TabLimit: React.FC = () => {

  const RANGE_MIN_TAB_LIMIT = 1;
  const RANGE_MAX_TAB_LIMIT = 20;
  const RANGE_STEP_TAB_LIMIT = 1;
  const INITIAL_TAB_LIMIT = { active: false, limit: 10};

  const [tabLimit, setTabLimit] = useState(() => {
    return Storage.get('tab_limit', INITIAL_TAB_LIMIT, value => JSON.parse(value))
  });

  useEffect((): void => {
      if (tabLimit === INITIAL_TAB_LIMIT) {
          return;
      }
      
      Storage.set('tab_limit', JSON.stringify(tabLimit), true)
  }, [tabLimit]);


  return (
    <>
      <Typography id="discrete-slider-small-steps" gutterBottom>
          Limit of tabs that can open: <strong>{tabLimit.limit}</strong>
      </Typography>
      <TabLimitContainer>
          <Grid item xs>
            <Slider
              value={tabLimit.limit}
              onChange={(e: ChangeEvent, value: number) => setTabLimit({ ...tabLimit, limit: value})}
              step={RANGE_STEP_TAB_LIMIT}
              min={RANGE_MIN_TAB_LIMIT}
              max={RANGE_MAX_TAB_LIMIT}
            />
          </Grid>
          <FormControlLabel
            control={
              <Switch
                checked={tabLimit.active}
                onChange={(e: ChangeEvent, checked: boolean) => setTabLimit({ ...tabLimit, active: checked})}
                color="primary"
              />
            }
            label="Is active?"
          />
      </TabLimitContainer>
    </>
  )
}

export default TabLimit
