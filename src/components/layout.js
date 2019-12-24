/** @jsx jsx */
import { jsx, Styled, useColorMode } from "theme-ui"
import React from "react"
import { Link } from "gatsby"
import { Global } from "@emotion/core"
import { Button, Flex, Box, Heading } from "@theme-ui/components"
import {
  ColorPalette,
  ColorPicker,
  Fonts,
  FontWeights,
  LineHeights,
  FontSizes,
  ColorMode,
  Space,
  Editor,
  Row,
  StylesForm,
  SxMargin,
  SxPadding,
  SxColors,
  SxTypography,
} from "@theme-ui/editor"
import SkipLink from "./skip-link"

const StyledRow = ({ children, title }) => (
  <>
    <Row sx={{ mt: `3`, mb: `1` }}>
      <b sx={{ fontSize: `2`, letterSpacing: 1, color: `gray` }}>{title}</b>
    </Row>
    <Row sx={{ mb: `3` }}>{children}</Row>
  </>
)

const NavLink = ({ children, ...props }) => (
  <Link
    {...props}
    sx={{
      color: `text`,
      textDecoration: `none`,
      px: `3`,
      py: `2`,
      transition: `0.25ms all ease-in-out`,
      borderRadius: `2`,
      "&:hover": {
        bg: `soft`,
      },
    }}
  >
    {children}
  </Link>
)

const modes = ["light", "dark", "deep", "swiss"]

export default ({ children }) => {
  const [mode, setMode] = useColorMode()

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
    <Styled.root>
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
          },
          body: {
            margin: 0,
          },
        }}
      />
      <SkipLink>Skip to content</SkipLink>
      <Flex
        sx={{
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Flex
          as="header"
          sx={{
            height: 64,
            px: 3,
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: theme => `1px solid ${theme.colors.border}`,
          }}
        >
          <Flex sx={{ alignItems: "center" }}>
            <Link to="/" sx={{ variant: "links.nav", fontSize: `3` }}>
              Theme UI Gallery
            </Link>
          </Flex>
          <Flex>
            <Button
              sx={{
                variant: "buttons.ghost",
                py: `1`,
                px: `2`,
                fontSize: `1`,
              }}
              onClick={cycleMode}
            >
              {mode}
            </Button>
          </Flex>
        </Flex>
        <div
          sx={{
            display: `grid`,
            gridTemplateColumns: `240px 3fr 2fr`,
            justifyContent: "space-between",
            height: `calc(100vh - 64px)`,
          }}
        >
          <Box
            sx={{
              p: `3`,
              borderRight: theme => `1px solid ${theme.colors.border}`,
              display: `flex`,
              flexDirection: `column`,
              height: `calc(100vh - 64px)`,
              "& *+*": {
                mt: `1`,
              },
            }}
          >
            <NavLink to="buttons">Buttons</NavLink>
            <NavLink to="navigation">Navigation</NavLink>
          </Box>
          <Box
            sx={{
              p: `3`,
              bg: `soft`,
              overflowY: `auto`,
              height: `calc(100vh - 64px)`,
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              position: `relative`,
              borderLeft: theme => `1px solid ${theme.colors.border}`,
              height: `calc(100vh - 64px)`,
            }}
          >
            <Box
              sx={{
                p: `3`,
                height: `100%`,
                overflowY: `scroll`,
              }}
            >
              <Heading>Theme Editor</Heading>
              <Editor
                fontSize={12}
                sx={{
                  "& * > label": {
                    color: `grays.6`,
                  },
                  "& * > input": {
                    color: `text`,
                  },
                  "& *": {
                    borderRadius: `2`,
                  },
                }}
              >
                <StyledRow title="Fonts">
                  <Fonts
                    sx={{
                      borderRadius: `2`,
                      variant: "@theme-ui/editor.select",
                    }}
                  />
                </StyledRow>
                <StyledRow title="Font Sizes">
                  <FontSizes />
                </StyledRow>
                <StyledRow title="Font Weights">
                  <FontWeights />
                </StyledRow>
                <StyledRow title="Line Heights">
                  <LineHeights />
                </StyledRow>
                <Row sx={{ mt: `3`, mb: `1` }}>
                  <b sx={{ fontSize: `2`, letterSpacing: 1 }}>Colors</b>
                </Row>
                <ColorMode />
                <ColorPalette
                  size={32}
                  label={false}
                  sx={{ border: theme => `1px solid ${theme.colors.border}` }}
                />
                <StyledRow title="Space">
                  <Space />
                </StyledRow>
              </Editor>
            </Box>
            <Box
              sx={{
                position: `absolute`,
                p: `3`,
                bg: `background`,
                borderTop: theme => `1px solid ${theme.colors.border}`,
                bottom: 0,
                right: 0,
                left: 0,
              }}
            >
              Button
            </Box>
          </Box>
        </div>
      </Flex>
    </Styled.root>
  )
}