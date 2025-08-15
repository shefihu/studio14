import { cardsData } from "../data/dummy/resources";
import type { JSX } from "react";

import type {
  AccentCorner,
  DocumentType,
  IconComponent,
  ResourceItem,
} from "../types/resources";

interface ExistingCardData {
  title: string;
  subTitle: string;
  icon: () => JSX.Element;
  tagLabel: string;
  accentIcon: JSX.Element;
  accentCorner: string;
  accentWidth?: string;
  documentType?: string;
  height?: {
    base?: string;
    lg?: string;
    md?: string;
  };
  isActive?: boolean;
}

class ResourceService {
  async getResources(): Promise<ResourceItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const transformedData: ResourceItem[] = cardsData.map(
          (card: ExistingCardData, index: number) => {
            const documentType = this.validateDocumentType(
              card.documentType || "DOC"
            );

            return {
              id: `resource-${index}`,
              title: card.title,
              subTitle: card.subTitle,
              icon: card.icon as IconComponent,
              tagLabel: card.tagLabel,
              accentIcon: card.accentIcon,
              accentCorner: this.normalizeAccentCorner(card.accentCorner),
              accentWidth: card.accentWidth,
              height: card.height,
              foundationalPrinciple: card.tagLabel,
              category: "Sample",
              documentType: documentType,
            };
          }
        );
        resolve(transformedData);
      }, 500);
    });
  }

  private validateDocumentType(documentType: string): DocumentType {
    const validTypes: DocumentType[] = ["PDF", "Video", "Link", "DOC"];

    if (validTypes.includes(documentType as DocumentType)) {
      return documentType as DocumentType;
    }

    console.warn(
      `Invalid document type: "${documentType}". Defaulting to "DOC"`
    );
    return "DOC";
  }

  private normalizeAccentCorner(corner: string): AccentCorner {
    const normalizedCorner = corner.toLowerCase();
    switch (normalizedCorner) {
      case "tr":
      case "top-right":
        return "tr";
      case "tl":
      case "top-left":
        return "tl";
      case "t":
      case "top":
        return "t";

      default:
        return "tr";
    }
  }
}

export const resourceService = new ResourceService();
