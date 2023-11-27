import Head from 'next/head'
import React, {useEffect} from 'react'
import type {NextraThemeLayoutProps} from 'nextra'
import {Sidebar} from './sidebar/Sidebar'
import {
  MinimalFooter,
  ThemeProvider as BrandThemeProvider,
  AnimationProvider,
  Animate,
  InlineLink,
  Box,
  Grid,
  Stack,
} from '@primer/react-brand'
import {Box as PRCBox, ActionList, ActionMenu, BaseStyles, PageLayout, ThemeProvider} from '@primer/react'
import {MoonIcon, PencilIcon, SunIcon, SyncIcon} from '@primer/octicons-react'

import '@primer/react-brand/lib/css/main.css'
import '@primer/react-brand/fonts/fonts.css'

import bodyStyles from './css/prose.module.css'
import {Header} from './header/Header'
import {TableOfContents} from './components/layout/table-of-contents/TableOfContents'
import themeConfig from '../theme.config'

export default function Layout({children, pageOpts}: NextraThemeLayoutProps) {
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light')

  const {title, frontMatter, headings, filePath, pageMap, route} = pageOpts

  const isHomePage = route === '/'

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', colorMode)
  }, [colorMode])

  return (
    <BrandThemeProvider dir="ltr" colorMode={colorMode}>
      <ThemeProvider colorMode={colorMode}>
        {/* @ts-ignore */}
        <BaseStyles>
          <Head>
            <title>{title}</title>
            <meta name="og:image" content={frontMatter.image} />
          </Head>
          <AnimationProvider runOnce visibilityOptions={1} autoStaggerChildren={false}>
            <Animate animate="fade-in">
              <PageLayout containerWidth="full" padding="none" sx={{pt: 76}}>
                <PageLayout.Header>
                  <Header pageMap={pageMap} />
                </PageLayout.Header>
                <PageLayout.Content padding="normal">
                  <Grid>
                    <Grid.Column span={!isHomePage && {large: 9}}>
                      <article className={route != '/' ? bodyStyles.Prose : ''}>{children}</article>
                      <Box marginBlockStart={64}>
                        <Stack direction="horizontal" padding="none" alignItems="center" gap={8}>
                          <PencilIcon size={16} fill="var(--brand-InlineLink-color-rest)" />

                          <InlineLink href={`${themeConfig.docsRepositoryBase}/blob/main/${filePath}`}>
                            Edit this page
                          </InlineLink>
                        </Stack>
                      </Box>
                    </Grid.Column>
                    {!isHomePage && headings.length > 0 && (
                      <Grid.Column span={{large: 3}}>
                        <TableOfContents headings={headings} />
                      </Grid.Column>
                    )}
                  </Grid>
                </PageLayout.Content>
                <PageLayout.Pane
                  sticky
                  offsetHeader={76}
                  padding="condensed"
                  position="start"
                  divider="line"
                  width={{
                    min: `180px`,
                    max: `240px`,
                    default: `200px`,
                  }}
                  resizable
                >
                  <Sidebar routes={pageMap} />
                  <PRCBox
                    sx={{
                      borderTop: '1px solid var(--brand-color-border-muted)',
                      mt: 4,
                      pt: 4,
                    }}
                  >
                    <ActionMenu>
                      <ActionMenu.Button
                        variant="invisible"
                        alignContent="start"
                        block
                        leadingVisual={colorMode === 'light' ? SunIcon : MoonIcon}
                      >
                        {colorMode === 'light' && 'Light'}
                        {colorMode === 'dark' && 'Dark'}
                      </ActionMenu.Button>

                      <ActionMenu.Overlay>
                        <ActionList>
                          <ActionList.Item onSelect={() => setColorMode('light')}>Light</ActionList.Item>
                          <ActionList.Divider />
                          <ActionList.Item onSelect={() => setColorMode('dark')}>Dark</ActionList.Item>
                        </ActionList>
                      </ActionMenu.Overlay>
                    </ActionMenu>
                  </PRCBox>
                </PageLayout.Pane>
                <PageLayout.Footer>
                  <MinimalFooter />
                </PageLayout.Footer>
              </PageLayout>
            </Animate>
          </AnimationProvider>
        </BaseStyles>
      </ThemeProvider>
    </BrandThemeProvider>
  )
}
